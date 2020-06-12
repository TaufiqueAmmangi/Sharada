Cache Control Headers 〰️〰️〰️〰️

1️⃣ The Cache-Control general-header field is used to specify directives for caching mechanisms in both requests and responses. Caching directives are unidirectional. I will only list most commonly used directives. The full list can be found here.
no-store
no-cache
max-age=<seconds>
must-revalidate

2️⃣ The Pragma HTTP/1.0 general header is used for backwards compatibility with HTTP/1.0 caches where the Cache-Control HTTP/1.1 header is not yet present. It includes only one directive no-cache.
We will be dealing mostly with the above ones and I will be explaining these as we get deeper into patterns. Most of patterns found on the internet falls into one of the following.

🥈🥈🥈 Strategy 1 : Very Less Caching or No Caching 🥈🥈🥈
To turn off caching, send the following response header.
👉 Cache-Control: no-cache, no-store, must-revalidate
👉👉 This instructs the browser or an intermediate caching server not to store any static files.
👉 no-store means do not store particular resource from the server anywhere (i.e browser or proxy caching ).
👉 no-cache doesn’t mean “don’t cache”, it means it must revalidate with the server before using the cached resource.
👉 must-revalidate doesn't mean "must revalidate", it means the local resource can be used if it's younger than the provided max-age, otherwise it must revalidate.
👉 max-age Specifies the maximum amount of time a resource will be considered fresh. This directive is relative to the time of the request whereas Expires, specifies the expiration in GMT.


Difference between Cookies 🍪🍪🍪 & Cache - https://medium.com/techblogout/whats-the-difference-between-cache-and-cookies-53e7f4f094bb   

Cache-Control - Pragma 👉 https://www.geeksforgeeks.org/http-headers-pragma/