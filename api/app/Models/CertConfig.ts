import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class CertConfig extends BaseModel {
  public static table = 'cert_config'
  @column({ isPrimary: true })
  public id: string

  @column({})
  public mediaId: string

  @column({})
  public name_x: number

  @column({})
  public name_y: number

  @column({})
  public logo_x: number

  @column({})
  public logo_y: number

  @column({})
  public qr_x: number

  @column({})
  public qr_y: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get incrementing() {
    return false
  }

  @beforeCreate()
  public static async createUUID(model: CertConfig) {
    model.id = uuid()
  }
}
