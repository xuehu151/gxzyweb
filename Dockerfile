#ʹ��nodejs
FROM finfosoft/nodejs

#ά������Ϣ
MAINTAINER zhangxuanchao "53536364@qq.com"

#nodejs �ļ��ϴ���������
ADD gxzyweb.tar /home/app/webapps/
ADD run.sh run.sh

RUN chmod +x run.sh

#npm

#��¶�˿�
EXPOSE 3000

CMD ["./run.sh"]