# Online SQL editor
Tech stack and packages
- React
- AntD
- Tailwind
- CodeMirror for editor
- react-csv for download

# Performance test:
Report Link: https://gtmetrix.com/reports/dummysqleditor.netlify.app/72MA8Kit/
![image](https://github.com/hitenSharm/sqlEditor/assets/56029311/a29c0e13-d133-4e4d-ad20-0a30d501a0ff)
Source: gtMetrix

Features:
- Favorite queries can be added
- Paginated response

Search was not implemented as it seemed redundant to add a search when the user is actually supposed to write a sql query to search in a real editor.

# Optimizations:
All done on a code level, no major optimizations. (Tried implementing a LRU Cache for queries for quick response and removing the need to parse csv repeatedly but was having some trouble and had shortage of time due to exams). 

## Further thoughts on optimizations:
In a real editor, sql query will be executed by the server. It makes it possible to send paginated responses from the backend itself. I personally think that it would be better then sending the complete data to the frontend and paginating on the client as the data might be very large. (Beyond the scope of this project)


