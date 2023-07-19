

CREATE TABLE IF NOT EXISTS transactionClient(
                                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                client_email TEXT,
                                                client_name TEXT,
                                                client_password TEXT,
                                                typeTransaction TEXT,
                                                montant TEXT,
                                                dateTransaction TEXT,
                                                qrCode TEXT,
                                                numeroPhone TEXT,
                                                fees INTEGER,
                                                nameSender TEXT,
                                                surnameSender TEXT,
                                                numerophoneB TEXT,
                                                nameB TEXT,
                                                surnameB TEXT




);
-- INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (1, 'Syllicon@valley.com', 'valley','ururur4567','Retrait','40000','16 janv 2023','tegofiufuf','776540987',2,'','','','','');
-- INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (2, 'Syllicon@valley.com', 'sillicon','ururur4567','Depot','40000','24 mars 2000','tegofiufuf','770540387',1,'','','','','');
-- INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (3, 'Syllicon@valley.com', 'hamidou','ururur4567','Retrait','40000','18 avril 2022','tegofiufuf','776540987',1,'','','','','');
-- INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (4, 'Syllicon@valley.com', 'moussa','ururur4567','Retrait','40000','03 juin 2021','tegofiufuf','772540987',1,'','','','','');
-- INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (5, 'Syllicon@valley.com', 'lamine','ururur4567','Depot','40000','16 janv 2000','tegofiufuf','776840987',1,'','','','','');
INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (6, 'Syllicon@valley.com', 'jule','ururur4567','Transfert','40000','16 janv 2000','tegofiufuf','776544987',1,'','','','','');
INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (7, 'Syllicon@valley.com', 'diallo','ururur4567','Retrait','40000','16 janv 2000','tegofiufuf','776340987',0,'','','','','');
INSERT or IGNORE INTO transactionClient(id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (8, 'Syllicon@valley.com', 'karim','ururur4567','Transfert','40000','16 janv 2000','tegofiufuf','771940987',3,'','','','','');
