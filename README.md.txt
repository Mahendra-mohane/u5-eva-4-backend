BACKEND - IP INFO APP
IP Info Application
Make an IP info application using Nodejs, Express, MongoDB, Redis etc which accepts an valid IP address from a user and returns the IP info (the city where that IP is present)
Make sure that a user is logged in to use your application.
Maintain a blacklisting mechanism for managing logout and store the blacklisted tokens in Redis (not in an array in a file or somewhere in the nodejs server)
Have a meaningful endpoint to show current location (just current city is enough, exact co-ordinates are not required) for a specific IP given by the user.
Use any API such as https://ipapi.co/api/#introduction or any API by googling on your own, to retrieve the current city for a specific IP.
Use Redis to cache the IP info. This way your application can quickly retrieve the IP Info/City for a particular IP without having to make a new API request, irrespective of the user, for a particular IP.
The data stored in Redis for a particular IP should expire in 6 hours.
^ Implement a mechanism to check if the data is already present in Redis before making an API call to get IP Info.
Use MongoDB Atlas to store each user's searches in the DB
Use Winston for logging - log any errors in application to a collection in the DB.
Have a validation middleware which checks that the IP passed by the user to get the IP info is in valid IP address format, so that you don't waste an API request to any IP info API with invalid IP address.
Follow all the best practices, such as following the MVC structure, storing all secret things in .env, committing regularly with proper git messages, clean code, etc.
Deploy Backend
Neatly mention in your readme.md file how your deployed link should be used with endpoints and their description etc
NOTE
Feel free to refer any official documentation if required.
Please note that some of the free API's you'll be using to get "IP info" will have limits on how many requests you can make in a free tier, so use it mindfully.