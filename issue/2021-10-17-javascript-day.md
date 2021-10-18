---
Issue: 1
Title: HTMX at JavaScript Day
Authors: 
- Deniz Akşimşek <https://denizaksimsek.com>
---

## Carson gave a talk on htmx at JetBrains JavaScript Day 2021

In his talk <cite>htmx: Writing JavaScript to Avoid Writing JavaScript</cite>,
Carson delivered a rationale and demonstration of htmx, and obligatory 
discussion of REST/HATEOAS as usual... to an audience for whom it was quite 
out of the ordinary. Was he provocative enough to get some JavaScripters 
curious? We'll have to see. 

💙 to the conference organizers and attendees!

<https://youtu.be/R2Q0L9PDHtc?t=15881>


## Ben Pate committed to refactoring SSE & WebSocket support into plugins

{{#> chatlog time='20211013T1144+03' url="725789699527933952/725789747212976259/897947897377742888" }}
1cg: pull web sockets and server sent events out into extensions [👍5][👎1]
benpate: Just say "go" and I'll volunteer to do it 
1cg: go  
1cg: 1.7 we will pull them out
benpate: F. What have I done?? [🇫1][😂1]
{{/ chatlog}}

## Carson explains how to make third-party components work with htmx

{{#> chatlog time='20211014T1301+03' url="725789699527933952/725789747212976259/897967236420096000"}}
1cg: Ah, OK.  So, here's the deal
1cg: and I need to document this, sorry
{{/ chatlog}}

When using a JavaScript library that makes a lot of modifications to the DOM,
the modified DOM being saved into history is usually undesirable and can lead
to bugs. Carson explains how to avoid it.

In summary, initialize your libraries in `htmx.onLoad()`, and _uninitialize_
them on the `htmx:beforeHistorySave` event.

{{#> chatlog time='20210114T1344+03' url="725789699527933952/725789747212976259/897978077232107560"}}
Fubarrr: [...] If you want your back button to behave as you expect it to… 
  this pattern of “undoing” all the DOM manipulation your JS widgets did 
  initially on page/fragment load, is critical. [...]
{{/ chatlog}}

<https://discordapp.com/channels/725789699527933952/725789747212976259/897967497335148605>


## Thomas Güttler reminded us about the htmx tag on StackOverflow

{{#> chatlog time='20211012T1041+03' url="725789699527933952/725789747212976259/897569632708345927"}}
guettli: I think up to now I am the only one who tries to support new htmx
  users which  ask a question on Stackoverflow. It would be very nice, if some 
  more users could subscribe to the tag htmx, so that you receive an email if a
  new htmx question got asked: <https://stackexchange.com/filters/409974/htmx>
  
  Of course I will up-vote your answers 🙂
{{/ chatlog}}

You heard him, folks.

<https://stackexchange.com/filters/409974/htmx>


## _hyperscript adopted the microbundle build system

Don't worry, _hyperscript will always be available as a single file that you
can load from a CDN. However, we can now make ES module builds available as
well! 

<https://github.com/developit/microbundle>


## URL literals for _hyperscript were considered

{{#> chatlog time='20211012T1732+03' url="725789699527933952/796428329531605032/897491928990515250"}}
@alleho: how can you fetch a url that has been built and placed inside a variable?
{{/ chatlog}}

This question started a whole discussion that ended with *URL literals* as a 
potential new feature. Here's a peek at how that might look:

  ~~~ hyperscript
  set url to https://cors.example.com/api 
  append /user?id=${the userId} to url.pathname
    
  fetch url
  ~~~

## htmx was brought up in a Hacker News thread about Laravel Livewire

Let me check again... Nope, that's not LimeWire.

{{#> chatlog time='20211013T1149+03' url="725789699527933952/725789747212976259/897949295674818560"}}
@1cg: htmx swoopin' on livewire on orange site:
@1cg: [Screenshot: "How Laravel Livewire works", top comment is about htmx]
{{/ chatlog}}

Hacker News is far from a good barometer for the general community of 
developers (someone tell Paul Graham!) but the attention feels too good to
ignore it. 

<https://news.ycombinator.com/item?id=28850757>

💙 to Livewire and the Laravel community!
