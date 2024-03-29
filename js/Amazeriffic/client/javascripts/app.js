var main = function(toDoObjects) {
	"use strict"

	var toDos = toDoObjects.map(function(toDo){
		return toDo.description;
	});

	$(".tabs a span").toArray().forEach(function(element) {
		var $element = $(element);

		$element.on("click", function() {
			var $content,
				$input,
				$button,
				i;

				$(".tabs a span").removeClass("active");
				$element.addClass("active");
				$("main .content").empty();

				if($element.parent().is(":nth-child(1)")) {
					$content = $("<ul>");
					for(i=toDos.length-1; i>=0; i--) {
						$content.append($("<li>").text(toDos[i]));
					}
				} else if($element.parent().is(":nth-child(2)")) {
					$content = $("<ul>");
					toDos.forEach(function(toDo) {
						$content.append($("<li>").text(toDo));
					});
				} else if($element.parent().is(":nth-child(3)")) {
					var tags = [];
					toDoObjects.forEach(function(toDo) {
						 toDo.tags.forEach(function (tag) {
	                        if (tags.indexOf(tag) === -1) {
	                            tags.push(tag);
	                        }
                    	});
					});
					console.log(tags);

					var tagObjects = tags.map(function(tag) {
						var toDosWithTag = [];

						toDoObjects.forEach(function(toDo) {
							if(toDo.tags.indexOf(tag) !== -1) {
								toDosWithTag.push(toDo.description);
							}
						});
						return {"name" : tag, "toDos": toDosWithTag };
					});
					console.log(tagObjects);

					tagObjects.forEach(function(tag) {
					var	$tagName = $("<h3>").text(tag.name);
						$content = $("<ul>");

						tag.toDos.forEach(function(description) {
							$content.append("<li>").text(description);
						});
						$("main .content").append($tagName);
						$("main .content").append($content)
					});

				} else if($element.parent().is(":nth-child(4)")) {
					var $input = $("<input>").addClass("description"),
						$inputLabel = $("<p>").text("Description:"),
						$tagInput = $("<input>").addClass("tags"),
						$tagLabel = $("<p>").text("Tags:"),
						$button = $("<span>").text("+");

						$button.on("click", function () {
							var description = $input.val(),
							tags = $tagInput.val().split(','),
							newToDo = {"description": description, "tags": tags};

							$.post("toDos", newToDo, function(result) {
								toDoObjects = result;

								toDos = toDoObjects.map(function(toDo) {
									return toDo.description;
								});
								$input.val("");
								$tagInput.val("");
							});
						});

						$content = $("<div>").append($inputLabel)
											 .append($input)
											 .append($tagLabel)
											 .append($tagInput)
											 .append($button)



				}

				$("main .content").append($content);
				return false


		});
	});
	 $(".tabs a:first-child span").trigger("click");
};
$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});

