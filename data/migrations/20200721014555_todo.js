exports.up = function (knex) {
  return knex.schema.createTable('todo', function (table) {
    table.increments()
    table.text('task', 128).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todo')
}
