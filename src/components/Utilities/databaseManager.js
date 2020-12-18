const getUser = () => {
                           //amra dekhte chai userId name e kno session storage r element ache kina
                            const existingUser = sessionStorage.getItem('userId');  
                           
                         if (existingUser) {
                           return existingUser; 
                         } 
                          
                           else {
                         const newUser = 'user-' + new Date().getTime();//userId na thkle amra notun ekta id generate kore fltsi
                         sessionStorage.setItem('userId', newUser)//ebong newUser ta amra userId name e set kre dcchi
                           return newUser;
                         }
                           }


              //ekhne data ta k amra kivabe rakhteci...             
                         const getDataKey = () => {//getDataKey() function k call korle se  userId niye user  r ekta key baniye dicche
                         const userId = getUser();
                           return `emaJohn/carts/${userId}`//emna john hisebe rkhteci..jno onno kichu r sthe flict na kore
                         }

                         // push to local storage: a temporary place for database
                         //getDatabaseCart r mane database thke data pabar jnno
                         const getDatabaseCart = () => {
                         const dataKey = getDataKey();//key ta niye nicchi
                         const data = localStorage.getItem(dataKey) || "{}";//key use kore item khuje data te rakhtesi
                            return JSON.parse(data);//json format e newar jnno..jhtu localstorage e string format e thke
                         }


                         //addToDatabaseCart mane database e data add korar jnno
                         const addToDatabaseCart = (key, count) => {
                         const currentCart = getDatabaseCart();
                         currentCart[key] = count;//just property update
                           localStorage.setItem(getDataKey(), JSON.stringify(currentCart));//trpor localstorage e set kre dcchi string format ee
                        }

                        //data dlete korar jnno....
                         const removeFromDatabaseCart = key => {
                         const currentCart = getDatabaseCart();
                         delete currentCart[key];
                         //delete korar por current cart e jeta thkbe seta abr set kre dcchi
                         localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
                         }

                         //processOrder mane amr shopping cart ta empty hye jbe...
                         const processOrder = (cart) => {
                         localStorage.removeItem(getDataKey());//item remove r kaj
                         }

                          //onno file thke jno import kra jyy sejonno export kore rkhci
                           export { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart, processOrder };


                         // polyfill to support older browser
                         const localStorage = window.localStorage || (() => {
                         let store = {}
                            return {
                         getItem(key) {
                            return store[key]
                         },
                         setItem(key, value) {
                         store[key] = value.toString()
                         },
                         clear() {
                         store = {}
                         }
                         };
                         })()

                         const sessionStorage = window.sessionStorage || (() => {
                         let store = {}
                           return {
                         getItem(key) {
                           return store[key]
                         },
                         setItem(key, value) {
                         store[key] = value.toString()
                         },
                         clear() {
                         store = {}
                         }
                         };
                         })()
                         // end of poly fill
 //poly fill mne hcce code jno break na kore...js r kchu function na thklew jno amra manual code...
 // run korte pari   ...ager browser r jnno r ki                     