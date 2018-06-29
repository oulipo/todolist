$(function () {

    // TODO : Don't Repeat Yourself..
    
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: "http://localhost:8888/todolist/app.php",
        dataType: "json",
        success: function (todolist) {
            console.log(todolist);
            todolist$ = $("#todolist");
            todolist$.empty();
            todolist.forEach(function (item) {
                console.log(item);
                checked = (item.etat === 1) ? "done" : "";
                todolist$.prepend('<li class="list-group-item"><strong class="' + checked + '" data-id="' + item.id + '">' + item.item + '</strong><button type="button" class="close pull-left" aria-label="Close"><span aria-hidden="true">&times</span></button></li>');
            })
        }
    })

    $("#todolist").on("click", "span", function (e) {
        e.preventDefault();
        id = $(this).parent().siblings("strong").data("id"); // TODO
        etat = $(this).hasClass("done") ? 1 : 0;
        console.log("suppr ?", id, etat);
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: "http://localhost:8888/todolist/app.php",
            data: { "id": id, "action": "suppr" },
            dataType: "json",
            success: function (todolist) {
                console.log(todolist);
                todolist$ = $("#todolist");
                todolist$.empty();
                todolist.forEach(function (item) {
                    checked = (item.etat) ? "done" : "";
                    todolist$.prepend('<li class="list-group-item"><strong class="' + checked + '" data-id="' + item.id + '">' + item.item + '</strong><button type="button" class="close pull-left" aria-label="Close"><span aria-hidden="true">&times</span></button></li>');
                })
            }
        })
    })

    $("#todolist").on("click", "li strong", function (e) {
        e.preventDefault();
        //$(this).toggleClass("done");
        id = $(this).data("id");
        etat = $(this).hasClass("done") ? 1 : 0;
        console.log(id);
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: "http://localhost:8888/todolist/app.php",
            data: { "id": id, "etat": etat,"action": "check" },
            dataType: "json",
            success: function (todolist) {
                console.log(todolist);
                todolist$ = $("#todolist");
                todolist$.empty();
                todolist.forEach(function (item) {
                    checked = (item.etat) ? "done" : "";
                    todolist$.prepend('<li class="list-group-item"><strong class="'+checked+'" data-id="'+item.id+'">' + item.item + '</strong><button type="button" class="close pull-left" aria-label="Close"><span aria-hidden="true">&times</span></button></li>');
                })
            }
        })
    })

    $("#item").on("keypress", function (e) {
        if (e.which == 13) {
            let item = $("#item").val();
            console.log(item);
            if (item.length > 0) {
                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    url: "http://localhost:8888/todolist/app.php",
                    data: { "item": item, "action": "add" },
                    dataType: "json",
                    success: function (todolist) {
                        console.log(todolist);
                        todolist$ = $("#todolist");
                        todolist$.empty();
                        todolist.forEach(function (item) {
                            checked = (item.etat) ? "done" : "";
                            todolist$.prepend('<li class="list-group-item"><strong class="'+checked+'" data-id="'+item.id+'">' + item.item + '</strong><button type="button" class="close pull-left" aria-label="Close"><span aria-hidden="true">&times</span></button></li>');
                        })
                    }
                })
            }
        }
    })
})