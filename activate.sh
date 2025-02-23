# source venv/bin/activate 
sudo modprobe v4l2loopback devices=1 video_nr=10 card_label="VirtualCam" exclusive_caps=1
ffmpeg -re -stream_loop -1 -i video_demos/vid1.mp4 -vf "format=yuv420p" -f v4l2 /dev/video10