import * as moment from 'moment';

export class Article {
         id: number;
         title: string;
         description: string;
         author: string;
         date: moment.Moment;
         //git
         constructor(id: number, title: string, description?: string,
           author: string = 'Serge') {
           this.id = id;
           this.title = title;
           this.description = description;
           this.author = author;
           this.date = moment();
         }
       }

// [{
//     "id":: 0,
//     "title":: "Article n 1",
//     "description"::"lorem ipsum",
//     "author":: "jeremy",
//     "date" ::"28-02-2018"
// },{
//     "id":: 1,
//     "title":: "Article n2",
//     "description"::"lorem ipsum",
//     "author":: "jeremy",
//     "date" ::"28-02-2018"
// },
// "id":: 2,
// "title":: "Article n 3",
// "description"::"lorem ipsum",
// "author":: "jeremy",
// "date" ::"28-02-2018"
// }
// ]
