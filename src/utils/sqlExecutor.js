import initSqlJs from 'sql.js';
// const initSqlJs = window.initSqlJs;
export const initDB = async (initSql) => {
  // 创建数据库
  const SQL = await initSqlJs({
    locateFile: () => '/sql-wasm.wasm',
  });
  const db = new SQL.Database()
  if (initSql) {
    db.run(initSql)
  }
  return db
}

export const runSQL = (db, sql) => {
  return db.exec(sql)
}
