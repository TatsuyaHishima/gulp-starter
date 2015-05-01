## What you can do
- gulp
- jade
- scss
- js minify
- image minify
- live reload

## preparation

必要な環境
This needs following module,
- nodejs
- npm
- rbenv
- sass
- compass

私の環境では、
In my case,

```
$ node -v
v0.10.26
$ npm -v
1.4.3
```

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