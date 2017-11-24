# cloud

> A Vue.js project

## Build Setup

``` bash
# 全局安装webpack
cnpm install -g webpack

# 安装依赖
cnpm install

# 打包代码
webpack

# 开发过程中, 打包代码
cnpm run dev
```
# nginx 配置
```
server{
	   listen       8088;
      
       server_name  localhost;
	    location / {
			root /cloud/html;
            add_header Cache-Control 'no-store';
			index  index.html index.htm;

			try_files $uri $uri/ /index.html =404;
		  }
		   location ~* ^.+\.(css|js|txt|xml|swf|wav|png|jpg|json|woff|ttf)$ {  
			root  /cloud;
			access_log   off;  
			expires      30d;  
		} 
	}


```
访问 [localhost:8088/menus](http://localhost:8088/menus) 


