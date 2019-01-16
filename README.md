# sssh
SSH Connections and Tunnel console Helper

Under Development, documentation in progress

Create .sssh.json under your home folder and add an array of connections

```
[
  {
    "name": "Name of connection",
    "description": "More Details",
    "username": "ubuntu",
    "host": "ip.ip.ip.ip",
    "key": "path/to/key.pem"
  }, 
  {
    "name": "Another Connection",
    "description": "Additional Details",
    "username": "ubuntu",
    "host": "hostname.com",
    "portForward": "27017"
  },

]
```