//Creating a node

//var port = 3000;

exports.run = function(expressInstance, port)
{
    expressInstance.listen(port, () => {
        console.log(`Node server listening on port ${port}...`);
    });
}