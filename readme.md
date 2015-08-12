## What you can do
- gulp
- jade
- scss
- js minify
- image minify
- live reload

## preparation

動作環境
This is for
- Ubuntu 12.04
- Mac

必要な環境
This needs following module,
- nodejs
- npm
- rbenv
- sass
- compass

動作が確認されている環境は
In my case, 

```
$ node -v
v0.10.26
$ npm -v
1.4.3
```

nodeのバージョンがv0.12系だと動かないことが確認されてます。
It fonud that this won't work over v0.12.

v0.10系を使ってください。
Use v0.10.

UbuntuでError: watch ENOSPCが出るなら
If you are using Ubuntu and get "Error: watch ENOSPC", you can try
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Usage
```
sudo npm install
```

node-moduleファイルが出来たことを確認して、
Check there are node-module directory,
```
gulp
```