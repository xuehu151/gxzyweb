#使用nodejs
FROM finfosoft/nodejs

#维护者信息
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs 文件上传到容器中
ADD gxzyweb.tar /home/app/webapps/

#npm
RUN npm install -g cnpm
RUN cnpm install -g phonegap

#暴露端口
EXPOSE 3000

CMD ["cd","/home/app/webapps/gxzyweb"]
CMD ["phonegap"," serve -Y"]
CMD ["vmstat","10"]