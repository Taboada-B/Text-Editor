import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database done?
export const putDb = async (content) => {
  try {
    console.log('Post to the database');
    const jateDb = await openDB('jate', 1);
    // create a new transaction, specify database, data privileges
    const tx = jateDb.transaction('jate', 'readwrite');
    // open disred object store
    const store = tx.objectStore('jate');
    // put() method on store and pass content
    const request = store.put({ content });
    // get confirmation of request
    const result = await request;
    console.log('Data saved to database!', result);
  } catch (error) {
    console.error('putDb not implemented', error)
  };
};

// TODO: Add logic for a method that gets all the content from the database done? 
export const getDb = async () => {
  try {
    console.log('Get from database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('results: ', result);

  } catch (error) {
    console.error('getDb not implemented', error);
  }


};
initdb();
