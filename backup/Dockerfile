FROM armhf/debian:jessie

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
      cron \
      rsyslog \
    && rm -rf /var/lib/apt/lists/*

RUN touch /etc/crontab
RUN touch /var/log/cron.log

COPY crontab /tmp/crontab
RUN crontab /tmp/crontab && rm /tmp/crontab

COPY backup.sh /usr/lib/raposfly/backup.sh
RUN chmod +x /usr/lib/raposfly/backup.sh

VOLUME /var/lib/raposfly/

CMD rsyslogd && cron && tail -f /var/log/cron.log /var/log/syslog
