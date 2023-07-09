let pokemonRepository = (function () {
    let e = [];
    function t() {
        return e;
    }
    function n(t) {
        "object" == typeof t && e.push(t);
    }
    function o(e) {
        let t = document.querySelector(".modal-title"),
            n = document.querySelector(".modal-body");
        (t.innerHTML = e.name), (n.innerHTML = "");
        let o = document.createElement("div");
        (o.innerText = "Height: " + e.height + "M"), n.appendChild(o);
        let i = document.createElement("img");
        i.classList.add("pokemonImg"), (i.src = e.imageUrl), n.appendChild(i);
        let r = document.createElement("div");
        (r.innerText = "Weight: " + e.weight + "KG"), n.appendChild(r);
    }
    function i(e) {
        return fetch(e.detailsUrl)
            .then(function (e) {
                return e.json();
            })
            .then(function (t) {
                console.log(t),
                    (e.imageUrl = t.sprites.front_default),
                    (e.height = t.height),
                    (e.weight = t.weight),
                    (e.types = t.types.map(function (e) {
                        return e.type.name;
                    }));
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    let r = document.querySelector(".search-bar__input"),
        a = r.value;
    function l(e) {
        i(e)
            .then(() => {
                o(e);
            })
            .catch(() => {});
    }
    return (
        r.addEventListener("input", function e() {
            a = r.value;
        }),
        document.querySelector(".search-bar__button").addEventListener("click", function t() {
            (a = r.value),
                e.filter(function (e) {
                    e.name.toUpperCase() === a.toUpperCase() && ($("#pokemonModal").modal("toggle"), l(e));
                });
        }),
        {
            add: n,
            getAll: t,
            addListItem: function e(t) {
                let n = document.querySelector(".list-group-item"),
                    o = document.createElement("li"),
                    i = document.createElement("button");
                o.classList.add("list-group-item", "d-flex", "row", "justify-center", "text-center", "border-0"),
                    i.classList.add("btn", "btn-success", "character-button"),
                    i.setAttribute("data-toggle", "modal"),
                    i.setAttribute("data-target", "#pokemonModal"),
                    (i.innerText = t.name),
                    i.addEventListener("click", function () {
                        l(t);
                    }),
                    o.appendChild(i),
                    n.appendChild(o);
            },
            loadList: function e() {
                return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
                    .then(function (e) {
                        return e.json();
                    })
                    .then(function (e) {
                        e.results.forEach(function (e) {
                            n({ name: e.name, detailsUrl: e.url, height: e.height, weight: e.weight });
                        });
                    })
                    .catch(function (e) {
                        console.error(e);
                    });
            },
            loadDetails: i,
            showDetails: l,
            showModal: o,
        }
    );
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
    });
});
