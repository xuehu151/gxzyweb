#使用nodejs
FROM finfosoft/nodejs

#维护者信息
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs 文件上传到容器中
ADD gxzyweb.tar /home/app/webapps/
ADD run.sh run.sh

RUN chmod +x run.sh

#npm

#暴露端口
EXPOSE 3000

CMD ["./run.sh"]