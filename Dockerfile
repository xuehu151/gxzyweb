#ʹ��nodejs
FROM finfosoft/nodejs

#ά������Ϣ
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs �ļ��ϴ���������
ADD * /home/app/webapps/

#��¶�˿�
EXPOSE 3000

CMD ["npm install -g cnpm"]
CMD ["cnpm install -g phonegap"]
CMD ["cd /home/app/webapps"]
CMD ["phonegap sever"]