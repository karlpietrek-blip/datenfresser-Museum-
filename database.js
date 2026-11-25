'use strict';
const dbReady = new Promise((resolve,reject)=>{
 const req=indexedDB.open('datenfresser-museum',1);
 req.onupgradeneeded=()=>req.result.createObjectStore('objects',{keyPath:'id',autoIncrement:true});
 req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(new Error('Datenbank ist blockiert.'));
});
async function transact(mode,action){const db=await dbReady;return new Promise((resolve,reject)=>{const tx=db.transaction('objects',mode);const req=action(tx.objectStore('objects'));tx.oncomplete=()=>resolve(req.result);tx.onerror=()=>reject(tx.error||req.error);tx.onabort=()=>reject(tx.error||new Error('Speicherung abgebrochen'));});}
const DB={all:()=>transact('readonly',s=>s.getAll()),add:o=>transact('readwrite',s=>s.add(o)),update:o=>transact('readwrite',s=>s.put(o)),remove:id=>transact('readwrite',s=>s.delete(id))};
