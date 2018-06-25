import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export function createLoginTable() {
  console.log('creating login table');
  Database.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS `login_tbl` (`id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `login` TEXT NOT NULL, `password` TEXT NOT NULL);'
      );
    },
    err => console.log(err),
    () => console.log('Successfully created login table.')
  );
}
