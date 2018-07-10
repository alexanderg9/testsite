package main

import (
	"net/http"

	"github.com/gorilla/mux"
	gomail "gopkg.in/gomail.v2"
)

func mainPage(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/index.html")
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
	m := gomail.NewMessage()
	m.SetHeader("From", "alexanderg9@mymacewan.ca")
	m.SetHeader("To", "alexanderg9@mymacewan.ca")
	m.SetHeader("Subject", "Hello!")
	m.SetBody("text/html", "Hello")

	d := gomail.NewDialer("smtp.example.com", 587, "user", "123456")

	// Send the email to Bob, Cora and Dan.
	if err := d.DialAndSend(m); err != nil {
		panic(err)
	}
}
