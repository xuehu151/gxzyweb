#ʹ��nodejs
FROM finfosoft/nodejs

#ά������Ϣ
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs �ļ��ϴ���������
ADD gxzyweb.tar /home/app/webapps/

#npm

#��¶�˿�
EXPOSE 3000

CMD ["cd","/home/app/webapps/gxzyweb"]
CMD ["phonegap","analytics off"]
CMD ["phonegap","serve"]