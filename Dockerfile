#ʹ��nodejs
FROM finfosoft/nodejs

#ά������Ϣ
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs �ļ��ϴ���������
ADD * /home/app/webapps/

#npm
RUN npm install -g cnpm
RUN cnpm install -g phonegap

#��¶�˿�
EXPOSE 3000

CMD ["cd","/home/app/webapps"]
CMD ["phonegap"," serve"]
CMD ["vmstat","10"]