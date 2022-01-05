import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CertConfigs extends BaseSchema {
  protected tableName = 'cert_config'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('mediaId')
      table.string('name_x')
      table.string('name_y')
      table.string('logo_x')
      table.string('logo_y')
      table.string('qr_x')
      table.string('qr_y')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
