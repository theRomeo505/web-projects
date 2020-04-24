    console.log("lk");

    $(document).ready(function () {
        var index = 0;

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function getLiked() {
            var cname = "likedjoke";

            liked = [];
            var n = getCookie("likedjokes")
            for (let i = 0; i < n; i++)
                liked.push(getCookie(cname + i));


            return liked;
        }
        var liked = getLiked();

        function getJoke(json, side) {
            var joke = document.createElement("div");
            var date = new Date(json.updated_at);

            date -= Date.now();
            date /= -3600000;
            if (side === "l") {
                if (json.categories.length != 0) {
                    $(joke).html("<div class='joke col-sm-10 align-self-center'><img src='images/Vector.svg' alt='' class='iconlikeactive i1'> <img src='images/heart.svg' alt='' class='iconlikeactive' hidden>                        <div class='row'>                            <div class='row-l col-2'>                                <div class='iconwrap'>                                    <img src='images/message.svg' alt='' class='icon'></div>            </div>                            <div class='row-r col-9'>                                <p class='id'>ID: <a href='" + json.url + "' class='jokehref'>" + json.id + "</a>                                </p>                                <p class='joketxt'>" + json.value + "</p>                                <p class='jokedate'>" + "updated last: " + Math.floor(date) + " hours ago" + "</p>                                <p class='jokecat'>" + json.categories + "</p>                            </div>                        </div>                    </div>");
                } else {
                    $(joke).html("<div class='joke col-sm-10 align-self-center'><img src='images/Vector.svg' alt='' class='iconlikeactive i1'> <img src='images/heart.svg' alt='' class='iconlikeactive' hidden>                        <div class='row'>                            <div class='row-l col-2'>                                <div class='iconwrap'>                                    <img src='images/message.svg' alt='' class='icon'></div>            </div>                            <div class='row-r col-9'>                                <p class='id'>ID: <a href='" + json.url + "' class='jokehref'>" + json.id + "</a>                                </p>                                <p class='joketxt'>" + json.value + "</p>                                <p class='jokedate'>" + "updated last: " + Math.floor(date) + " hours ago" + "</p>                                                            </div>                        </div>                    </div>");
                }
            } else {
                if (json.categories.length != 0) {
                    $(joke).html("<div class='joke col-sm-10 align-self-center'><img src='images/Vector.svg' alt='' class='iconlikeactive i1' hidden> <img src='images/heart.svg' alt='' class='iconlikeactive'>                        <div class='row'>                            <div class='row-l col-2'>                                <div class='iconwrap'>                                    <img src='images/message.svg' alt='' class='icon'></div>            </div>                            <div class='row-r col-9'>                                <p class='id'>ID: <a href='" + json.url + "' class='jokehref'>" + json.id + "</a>                                </p>                                <p class='joketxt'>" + json.value + "</p>                                <p class='jokedate'>" + "updated last: " + Math.floor(date) + " hours ago" + "</p>                                <p class='jokecat'>" + json.categories + "</p>                            </div>                        </div>                    </div>");
                } else {
                    $(joke).html("<div class='joke col-sm-10 align-self-center'><img src='imagesVector.svg' alt='' class='iconlikeactive i1' hidden> <img src='images/heart.svg' alt='' class='iconlikeactive' >                        <div class='row'>                            <div class='row-l col-2'>                                <div class='iconwrap'>                                    <img src='images/message.svg' alt='' class='icon'></div>            </div>                            <div class='row-r col-9'>                                <p class='id'>ID: <a href='" + json.url + "' class='jokehref'>" + json.id + "</a>                                </p>                                <p class='joketxt'>" + json.value + "</p>                                <p class='jokedate'>" + "updated last: " + Math.floor(date) + " hours ago" + "</p>                                                            </div>                        </div>                    </div>");
                }

            }
            return joke;
        }

        function renderR() {
            var jokes = $('.right').find("div");
            jokes.remove();
            for (let i = 0; i < liked.length; i++) {
                var myData;
                $.ajax({
                    url: liked[i],
                    dataType: 'json',
                    async: false,
                    data: myData,
                    success: function (data) {
                        var joke = (getJoke(data, "r"));
                        joke.setAttribute("class", "jokeRight");
                        $('.right').append(joke);
                    }

                })


            }
        }
        renderR();
        $.getJSON("https://api.chucknorris.io/jokes/categories", function (json) {
            var categ = document.createElement("label");

            categ.setAttribute("class", "btn btn-cat active");

            var input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "options");
            input.setAttribute("autocomplete", "off");
            input.setAttribute("id", "option" + 1)
            var node = document.createTextNode(json[0]);

            categ.appendChild(input);
            categ.appendChild(node);
            document.getElementById("radio").appendChild(categ);
            for (let i = 1; i < json.length; i++) {
                var categ = document.createElement("label");

                categ.setAttribute("class", "btn btn-cat");

                var input = document.createElement("input");
                input.setAttribute("type", "radio");
                input.setAttribute("name", "options");
                input.setAttribute("autocomplete", "off");
                input.setAttribute("id", "option" + (i + 1))
                var node = document.createTextNode(json[i]);

                categ.appendChild(input);
                categ.appendChild(node);
                document.getElementById("radio").appendChild(categ);
            }
        });

        $('.rb').click(function () {
            $('.rbactive').removeClass('rbactive')
            $(this).addClass("rbactive");

            if ($('.rb1').hasClass('rbactive')) {

                $('.bt-gr').addClass("hidden");
                $('.searchfield').addClass('hidden');
            }
            if ($('.rb2').hasClass('rbactive')) {

                $('.bt-gr').removeClass("hidden");
                $('.searchfield').addClass('hidden');
            }
            if ($('.rb3').hasClass('rbactive')) {

                $('.bt-gr').addClass("hidden");
                $('.searchfield').removeClass('hidden');
            }
        })

        $('.getj').click(function () {
            $('.h100').attr("style", "height: auto;");
            if ($('.rb1').hasClass("rbactive")) {
                $.getJSON("https://api.chucknorris.io/jokes/random", function (json) {
                    var joke = getJoke(json, "l");
                    var flag = true;
                    do {
                        flag = true;
                        liked.forEach(function () {
                            if ($(this) === joke.url)
                                flag = false;
                        })

                        joke = getJoke(json, "l");
                    } while (flag != true)
                    $('.main').append(joke);
                });

            }

            if ($('.rb2').hasClass("rbactive")) {
                var r = $(".btn-cat").filter(function (buttonn) {
                    return $(this).hasClass("active");
                });

                $.getJSON("https://api.chucknorris.io/jokes/random?category=" + r.text(), function (json) {
                    var joke = getJoke(json, 'l');
                    var flag;
                    do {
                        flag = true;
                        liked.forEach(function () {
                            if ($(this) === joke.url)
                                flag = false;
                        })

                        joke = getJoke(json, 'l');
                    } while (flag != true)
                    $('.main').append(joke);
                })
            }
            if ($('.rb3').hasClass('rbactive')) {
                if ($('.searchfield').val() === "") {
                    alert("Empty field");
                } else {

                    $.getJSON("https://api.chucknorris.io/jokes/search?query=" + $('.searchfield').val(), function (json) {
                        if (json.total > 0) {
                            var flag;
                            var joke = getJoke(json.result[index++], 'l');
                            do {
                                flag = true;
                                liked.forEach(function () {
                                    if ($(this) === joke.url)
                                        flag = false;
                                })

                                joke = getJoke(json.result[index++], 'l');
                            } while (flag != true)

                            if (index > json.total) index = 0;
                            $('.main').append(joke);
                        } else {
                            alert("no jokes");
                        }
                    })
                }
            }


        })

        $('.searchfield').on("change", function () {
            index = 0;
        })
        $(document).on("click", '.iconlikeactive', function () {
            if ($(this).hasClass("i1")) {
                document.cookie = "likedjoke" + liked.length + "=" + $(this).parent().find("a").attr("href") + ";";
                liked.push($(this).parent().find("a").attr("href"));
                document.cookie = "likedjokes=" + liked.length;
                //alert(liked);
                // renderR();
                $.getJSON($(this).parent().find("a").attr("href"), function (json) {
                    var joke = getJoke(json, "r");
                    joke.setAttribute('class', "jokeRight");
                    $('.right').append(joke);
                })


            } else {
                document.cookie = "likedjoke" + liked.length + "=; expires = Thu, 01 Jan 1970 00:00:00 GMT";



                for (let i = 0; i < liked.length; i++) {
                    if (liked[i] === $(this).parent().find("a").attr("href")) {
                        var a = $('.main').find('a');
                        for (let i = 0; i < a.length; i++) {

                            if ($(a[i]).attr("href") === $(this).parent().find("a").attr("href")) {

                                console.log($(a[i]).parent().parent().parent().parent().find("img").first());
                                $(a[i]).parent().parent().parent().parent().find("img").first().removeAttr("hidden");
                                $(a[i]).parent().parent().parent().parent().find(".iconlikeactive").last().attr("hidden", "hidden");
                                break;
                            }
                        }


                        liked.splice(i, 1);
                        $('.right').children().get(i + 1).remove();
                        break;
                    }
                }

            }
            document.cookie = "likedjokes=" + liked.length;


            $(this).parent().children().removeAttr("hidden");
            $(this).attr("hidden", "");
        });
        $('.favouritebutton').click(function () {

            $(".right").toggleClass("ractive");
            setTimeout(function () {
                $('.right').toggleClass("rop")
            }, 10);


            $('.favouritebtn').toggleClass('disabled');
            $('.right-hover').toggleClass("disabled");

        })
        $('.right-hover').click(function () {

            $(".right").toggleClass("ractive");
            setTimeout(function () {
                $('.right').toggleClass("rop")
            }, 10);
            $('.favouritebtn').toggleClass('disabled');
            $('.right-hover').toggleClass("disabled");
        })

    })
