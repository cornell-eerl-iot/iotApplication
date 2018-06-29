import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export function createLoginTable() {
  db.transaction(
    tx => {
      tx.executeSql('DROP TABLE `login_tbl`');
    },
    err => console.log(err),
    () => {}
  );
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS`login_tbl` (`email` TEXT NOT NULL PRIMARY KEY UNIQUE, `password` TEXT NOT NULL,  `name` TEXT NOT NULL, `salt` TEXT NOT NULL);'
      );
    },
    err => console.log(err),
    () => {}
  );
  addFakeUser();
}

function addFakeUser() {
  db.transaction(tx => {
    tx.executeSql(
      'insert into login_tbl values (?,?,?,?)',
      [
        'navinr13@gmail.com',
        '$2a$10$DiIVh.K7hqtAiRwRI4N4c.lBi6KTKYfxNBpDnMcmZuOSqMy0on1F.',
        'Navin',
        '$2a$10$DiIVh.K7hqtAiRwRI4N4c.'
      ],
      (t, rs) => {},
      (t, err) => {}
    );
  });
}

/*
thing passed into callback is an array of objects that correspond to that person's email address
Will be either length 0 or 1
*/
export function getPerson(email, callBack) {
  db.transaction(
    tx =>
      tx.executeSql(
        'select * from login_tbl where email = ?',
        [email],
        (t, rs) => {
          rs.rows.length == 1 ? callBack(rs.rows._array[0]) : callBack();
        },
        err => console.log('err', err)
      ),
    err => console.log('error in get person', err),
    () => console.log('')
  );
}

export function addPerson(email, password, salt, name, callBack) {
  db.transaction(
    tx =>
      tx.executeSql(
        'insert into login_tbl values (?,?,?,?)',
        [email, password, name, salt],
        (t, rs) => {},
        (t, err) => {}
      ),
    () => console.log('Did not complete request.'),
    (tx, rs) => console.log('Added peep.')
  );
}
