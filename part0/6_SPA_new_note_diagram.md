# 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: The data type is determined with a Content-type header (JSON).

    server-->>browser: [{"message":"note created"}]
    deactivate server

    Note right of browser: The browser rerenders the note list on the page.

