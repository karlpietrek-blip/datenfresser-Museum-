'use strict';
const FIELDS=[['inventory_number','Inventarnummer'],['object_type','Objektart'],['object_title','Objektname'],['object_description','Beschreibung',6],['object_material_technique','Material / Technik'],['object_dimensions','Maße'],['state','Zustand',3],['abode_regular','Standort'],['production_when1','Hergestellt Wann?']];
const quoteCSV=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
function makeCSV(records){return [FIELDS.map(f=>f[0]),...records.map(r=>FIELDS.map(f=>r[f[0]]??''))].map(row=>row.map(quoteCSV).join(';')).join('\r\n')+'\r\n';}
function fileName(d=new Date()){const p=n=>String(n).padStart(2,'0');return `Objektexport_${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}.csv`;}
