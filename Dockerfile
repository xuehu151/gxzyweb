#ʹ��nodejs
FROM finfosoft/nodejs

#ά������Ϣ
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs �ļ��ϴ���������
ADD gxzyweb.tar /home/app/webapps/

#npm
RUN npm install -g cnpm
RUN cnpm install -g phonegap

#��¶�˿�
EXPOSE 3000

CMD ["cd","/home/app/webapps/gxzyweb"]
CMD ["phonegap"," serve"]
CMD ["vmstat","10"]