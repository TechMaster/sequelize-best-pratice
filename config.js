module.exports = {
  host: 'payroll',
  database: 'payroll',
  user: 'postgres',
  port: 5432,
  password: 'abc',
  dialect: 'postgres',
  schema: 'cms'        //Bổ xung thêm một thuộc tính schema của Postgresql để chỉ rõ sẽ làm việc trên Schema nào
};