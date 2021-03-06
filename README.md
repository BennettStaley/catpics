# Bennett - 02/24/20

## Installation

    1. Clone this repository and CD into it
    2. Bootstrap node_modules, run "yarn" in this folder

    next you can run dev...
    2a. "yarn dev"

    or run production....
    2b. "yarn build && yarn start"


    and lastly, run tests...
    3. "yarn jest" for tests (very few)

notes: `yarn` can be swapped for npm, i just use yarn.

## Security

Addressed:

    - input is checked and only allowed for jpeg / png
    - base64 is only parsed on the server, once Mimetype has been checked
    - no files are written to disk
    - the buffer on server is parsed to string

Not Addressed:

    - SSL/HTTPS
    - verifying the base64 on the server
    - md5 hashing of base? could protect unwitting users, all img requests are verified as known good.
    - potential mimetype spoof with malicious base64?

## Improvements

    - code cleanup, error handling

    - graphQl!

    - rearanging? reordering?
    - editing name
    - photo editor
    - database integration
    - containerization with docker

## Libraries

@material-ui/core:

    Easy to use, nice looking Component Library.

styled-components:

    perhaps the most controversial, i really like using CSS-in-js solutions like this one.

axios:

    easy to use post request library, with auto content type parsing.

body-parser:

    serverside body parsing of json, not really used in this demo

express / express-fileupload:

    server + serverside file parsing and size limit checks

fuse / react-use-fuse:

    fuzzy search and a react hook wrapper

## API

```
### GET /images
    - would usually be a DB query, its in memory here
    - returns array images
    - accepts no params
    - could be used to get /image/[name] (with modification)

### POST /images
    - is looking for a file upload
    - returns the image that was just uploaded
    - accepts no params in the url
    - looks for the image as formData on request body

### POST /delete/[id]
    - deletes an image of the specified id
    - returns the image that was just deleted
    - requires an id as the parameter
```

---

## Other notes

Expansions I can see would be search indexes and using 3rd party, serverside search.

An easy win would be a DB hosting service, but for the sake of making this public I opted not to.

Obviously storing the images IN MEMORY on the server is a terrible, useless idea. But... here we are.

I used the cat from that one meme. His name is Smudge, Apparently.

![Image of Goblin Cat](https://i.kym-cdn.com/photos/images/newsfeed/001/535/422/b8d.jpg)
