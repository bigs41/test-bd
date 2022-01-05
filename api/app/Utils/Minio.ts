import Env from '@ioc:Adonis/Core/Env'
import _ from 'lodash'
import Url from 'url-parse'
import Fs from 'fs';
import Helper from './Helper';
import * as Minio from 'minio';

var minioClient = new Minio.Client({
    endPoint: Env.get('MINIO_END_POINT', 'localhost'),
    port: Helper.getNumber(Env.get('MINIO_PORT', 9000)),
    useSSL: Helper.getBoolean(Env.get('MINIO_USE_SSL', false)),
    accessKey: Env.get('MINIO_ACCESS_KEY'),
    secretKey: Env.get('MINIO_SECRET_KEY')
});

const bucketName = Env.get('MINIO_BUCKET_NAME', 'deep3');

minioClient.setBucketPolicy(bucketName, JSON.stringify({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicRead",
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject", "s3:GetObjectVersion"],
            "Resource": [`arn:aws:s3:::${bucketName}/*`]
        }
    ]
}))

export default {
    async updateObject(objectKey, expiry = 3 * 60) {

        const u = new Url(await minioClient.presignedPutObject(bucketName, objectKey, expiry), true)
        u.host = `${Env.get('MINIO_EXTERNAL_DOMAIN') || Env.get('MINIO_END_POINT', 'localhost')}:${Env.get('MINIO_PORT', 9000)}`
        return {
            SignedUrl: u.toString()
        }
    },
    async readObject(objectKey, options = {}) {
        return {
            SignedUrl: await this.readObjectUrl(objectKey, options)
        }
    },
    async readObjectUrl(objectKey) {
        return minioClient.presignedUrl('GET', bucketName, objectKey)
    },
    deleteObject(objectKey) {
        try {
            return minioClient.removeObject(bucketName, objectKey)
        } catch (e) {
            console.error(e)
        }
    },
    uploadFile(objectKey, file) {
        const fileStream = Fs.createReadStream(file)
        const stats = Fs.statSync(file)
        return minioClient.putObject(bucketName, objectKey, fileStream, stats.size)
    },
    uploadBuffer(objectKey, buffer) {
        return minioClient.putObject(bucketName, objectKey, buffer)
    },
    listObjects(prefix) {
        return new Promise((resolve, reject) => {
            const results = []
            const stream = minioClient.listObjectsV2(bucketName, prefix, false)

            stream.on('data', function (obj) {
                results.push(obj)
            })

            stream.on('error', function (err) {
                reject(err)
            })

            stream.on('end', () => resolve(results.filter(r => _.get(r, 'name'))))
        })
    },
    async deleteFolder(Prefix) {
        const objs = await this.listObjects(Prefix)
        return Promise.all(objs.map(o => {
            if (o.name)
                return this.deleteObject(o.name)
            else
                return this.deleteFolder(o.prefix)
        }))
    },
    async copyObject(copySource, key) {
        let conds = new Minio.CopyConditions()
        minioClient.copyObject(bucketName, key, copySource, conds)
    }
}