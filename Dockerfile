#ʹ��nodejs
FROM finfosoft/nodejs

#ά������Ϣ
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs �ļ��ϴ���������
ADD * /home/app/webapps/

#��¶�˿�
EXPOSE 3000

CMD ["tail -f /dev/null"]
