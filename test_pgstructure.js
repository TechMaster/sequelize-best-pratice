/**
 * Created by techmaster on 1/6/17.
 */
const pgStructure = require('pg-structure');

const _ = require('lodash');

pgStructure(config, [config.schema]).then(db => {
    const tables = db.schemas.get(config.schema).tables;  // Map of Table objects.
    const table_names = Array.from(tables.keys());
    console.log(table_names);
    return _.difference(['person', 'project', 'task', 'student', 'class', 'student_class'], table_names).length;
  }
).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});
