# Online SQL editor
Tech stack and packages
- React
- AntD
- Tailwind
- CodeMirror for editor
- react-csv for download

# Performance test:
Report Link: [GTMetrix](https://gtmetrix.com/reports/dummysqleditor.netlify.app/Ip1HJ123/)
![image](https://github.com/hitenSharm/sqlEditor/assets/56029311/1116c9fc-268b-449c-9427-c63a9d5f0701)

Source: gtMetrix

Features:
- Favorite queries can be added
- Paginated response
- Tables and description for queries have a Custom tool tip component, wrap text anywhere using it to get tool tip.
- When downloading csv, the file name is automatically based on query

Search was not implemented as it seemed redundant to add a search when the user is actually supposed to write a sql query to search in a real editor.

# Optimizations:
All done on a code level, no major optimizations. Implemented a LRU cache to remove repeated parsing of frequently used data. size was 10. 
LRU Cache Improvement:
Original:
![image](https://github.com/hitenSharm/sqlEditor/assets/56029311/240cc04b-0c7b-4bc6-9247-dc5939da5332)
After being cached:
![image](https://github.com/hitenSharm/sqlEditor/assets/56029311/f0b76d87-7edb-410e-8c94-9bcf51cd4c98)

The LRU cache benchmarks can be run in from utils.
![image](https://github.com/hitenSharm/sqlEditor/assets/56029311/9a8b846c-ff40-44cf-b794-860061ace886)


## Further thoughts on optimizations:
In a real editor, sql query will be executed by the server. It makes it possible to send paginated responses from the backend itself. I personally think that it would be better then sending the complete data to the frontend and paginating on the client as the data might be very large. (Beyond the scope of this project) For data larger than 50MB.

## Adding new queries
Make sure the last keyword of the query being added is the same as the filename in here: https://github.com/hitenSharm/sqlEditor/tree/master/src/csv

For example: run select * from territories for territories.csv
