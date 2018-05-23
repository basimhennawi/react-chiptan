Code structure
-------------
These flicker codes are the data that is also passed on to the external TAN generator; an example `11048714955205123456789F14302C303107`:

| Code | Description |
| --- | --- |
| 11 | Length of the code |
| 0 | Flag: BCD coded |
| 4 | 4 bytes long |
| 871 | Mask: 8 = free design, 7 = account number, 1 = amount, see masks |
| 49552 | Random number or transaction number |
| 0 | Flag: BCD coded |
| 5 | 5 bytes |
| 123456789F | Account number, BCD-coded, character F at the end |
| 1 | Flag: ASCII-coded |
| 4 | 4 bytes |
| 302C3031 | ASCII string: 0.01 |
| 0 | Luhn checksum |
| 7 | XOR checksum |

As you can see, each code is divided into several sections, each starting with a coding flag (BCD = 0 or ASCII = 1) and a length ( 0 - F ) and then (in theory) a maximum 16-byte payload contain.
