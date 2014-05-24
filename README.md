# Backloban

## Introduction
Backloban is meant to present a Product Backlog web tool together with a simple Kanban project manager. 
The project was designed to provide a complete nodejs web application together with front-office boilerplate 

The general idea is to provide a full scale web development tutorial, including its boilerplate. The project is also
all about providing projects a simple project management support through agile concepts of backlog.

## setup environment
* Fork product branch
* install mongodb binaries
* install node if not installed already.
* in mongodb bin folder
    * mongod.exe --dbpath %path to your database resources%
* in project folder, in a console, type
    * npm install // only the first time or after checkouts
    * npm start

That should setup everything, compile then launch the server. Now visit the application on http://localhost:3000 (by default)

## Current backlog items
The following items are simple descriptions so far. Content are implicit and subject to continuous change :)

### Glossary
*  product backlog or backlog : Prioritized features list for a given product. 
*  backlog item or item : One of the features for the product with a short description.

### Models

# Product
    {
      _id: ObjectId,
      name: text,
      description(?): text,
      doing-backlog: backlog, 
      todo-backlog: backlog,
      done-backlog: backlog
    }

# Backlog
    {
      _id: ObjectId,
      items:[
        {
            _id: ObjectId,
            name:text,
            detail: text,
            cost: int
        }, ...
      ]
     }

# ItemTasks 
    {
        _id:ObjectId,
        itemId:ObjectId,
        tasks:[
          {
            _id:ObjectId,
            name:text,
            detail:text,
            status:(todo| doing| done)
          }, ...
        ]
    }

### Current Backlog 
* [X] Setup application content (package.json, Gruntfile.js)
* [X] setup front-office environment
* [X] setup unit/integration test environment 
* [X] push general ui mockups
* [X] list products
* [X] create/edit/delete product
* [X] create/edit/delete product server side (REST API) and wire it
* [X] improve slightly ergonomics, cancel edition mode if one clicks outside the product view
* [ ] select product (i.e. go to the product detail view when product is selected)
* [ ] create minimal backlog item creation form
* [ ] list backlog items
* [ ] add new item to listing
* [ ] delete item from listing
* [ ] move items via drag 'n drop
* [ ] move selected item via keyup/keydown
* [ ] save and read items to server
* [ ] show item detail in backlog item listing
* [ ] add an item from the backlog to a ongoing work list item
* [ ] remove an item from ongoing listing back to backlog
* [ ] add nice icons and review design a bit
* [ ] create tasks under an ongoing item
* [ ] list tasks for a given item
* [ ] close/reopen task
* [ ] close backlog items
* [ ] add tags to backlog item
* [ ] list available tags 
* [ ] filter backlog per existing tags
* [ ] add simple timeline product progress chart
* [ ] take a nap and think about useful features such as user management, reporting or bug management




