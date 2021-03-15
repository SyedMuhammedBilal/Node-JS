1) <b>db.your_collection_name.find();</b>
   it will find all the documents in database

2) <b>db.your_collection_name.find().pretty()</b>
   it will format all the database documents


## ================ CRUD Operation ===================

## ---------- CREATE
There ways of creating or inserting a new document/documents in database

1) <b>db.your_collection_name.insertOne();</b>
2) <b>db.your_collection_name.insertMany();</b>

<b>Example 01 (insertOne):</b> 
    db.your_collection_name.insertOne(     <---------- collection 
        {
            name: 'Bilal',                 <---------- field: value or (key value pair) --|
            age: 19,                       <---------- field: value or (key value pair)   |--->  Document 
            status: 'single'               <---------- field: value or (key value pair) --|
        }
    )

<b>Example 02 (insertMany):</b>
    db.your_collection_name.insertMany([
        {
            name: 'Bilal',                 <---------- field: value or (key value pair) --|
            age: 19,                       <---------- field: value or (key value pair)   |--->  Document 
            status: 'single'               <---------- field: value or (key value pair) --|
        },
        {
            name: 'Shayan',                 <---------- field: value or (key value pair) --|
            age: 19,                       <---------- field: value or (key value pair)   |--->  Document 
            status: 'Double'               <---------- field: value or (key value pair) --|
        },
        {
            name: 'Junaid',                 <---------- field: value or (key value pair) --|
            age: 19,                       <---------- field: value or (key value pair)   |--->  Document 
            status: 'single'               <---------- field: value or (key value pair) --|
        }
    ])

## ---------- READ
ways of reading documents are as follows

1) <b>db.your_collection_name.find(query, projection)</b>
                                --|--  -----|-----
                              statement  show/hide

<b>Example:</b> 
    
    1) db.your_collection_name.find(); or db.your_collection_name.find().pretty();
       shows all the documents
    
    2) get only Junaid data as an output,
       db.your_collection_name.find( { name: "Junaid" } ).pretty();
       shows only one document in which "Junaid" is appeared
    
    3) get only name key as an output,
       db.your_collection_name.find( { name: "Junaid" }, { name: 1 } ).pretty();
                                      --------|--------  -----|-----
                                            Query     1 (show), 0 (hide)
        
        (NOTE): by default (_id) will be attached with the name key
    
    4) get only name key as an output with _id property
       db.your_collection_name.find( { name: "Junaid" }, { _id: 0, name: 1 } ).pretty();

       now it won't show _id again
    
    5) get only singles in status 
        db.your_collection_name.find( {status: "single"} ).pretty();

        now it will show all the documents, who are single in status
    
    6) get only singles in status but show only the first one
        db.your_collection_name.find( { status: "single" } ).pretty().limit(1);

        now it will show only first document 