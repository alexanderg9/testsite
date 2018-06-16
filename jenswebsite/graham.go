package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func mainPage(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/graham.html")
}

func setRoutes(r *mux.Router) {
	r.HandleFunc("/", mainPage)
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
}

func main() {
	r := mux.NewRouter()
	setRoutes(r)
	err := http.ListenAndServe(":8008", r)
	if err != nil {
		panic(err)
	}
}
