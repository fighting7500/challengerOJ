import md from './README.md?raw'
import sql from './createTable.sql?raw'

export default {
  key: 'level5',
  title: '基础语法 - 条件查询 - where',
  initSQL: sql,
  content: md,
  defaultSQL: 'select * from student',
  answer: "select name, score from student where name = ''",
  hint: '请仔细查看本关给出的示例',
  type: 'main'
}
