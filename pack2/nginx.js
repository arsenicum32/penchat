map $host $backend {

    default 9000;
    ~*^(?P<number>[0-9]+)\.sliceofring\.ru$        $number;

    # FIXME: [0-9]+ must be replaced to regex with accurate check 1..254 range
    # for example [1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4] or similar
}

server {
    listen 80;
    server_name *.sliceofring.ru;
    location / {
        proxy_pass http://127.0.0.1:$backend;
    }
}
