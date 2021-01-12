#include <fcntl.h> 
#include <fstream>
#include <linux/fb.h>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <sys/ioctl.h>
#include <iostream>
#include <unistd.h>
#include <string>
#include <vector>

struct framebuffer_info
{
    uint32_t bits_per_pixel;    // framebuffer depth
    uint32_t xres_virtual;      // how many pixel in a row in virtual screen
};

struct framebuffer_info get_framebuffer_info(const char *framebuffer_device_path);


std::ofstream* init_ofstream(const char* path)
{
    std::ofstream* ofs = new std::ofstream(path);
    return ofs;
}

framebuffer_info* init_framebuffer_info(const char* path)
{
    framebuffer_info info = get_framebuffer_info(path);
    framebuffer_info* fb_info = (framebuffer_info*) malloc(sizeof(info));
    memcpy(fb_info, &info, sizeof(info));
    return fb_info;
}

void flush(std::ofstream* ofs, framebuffer_info* fb_info)
{
    // Only When first time, flush dirty bits out 
    char arr[fb_info->xres_virtual*2] = {0};
    for (int y = 0; y < 480/*image_size.height*/; y++)
    {
        ofs->seekp(y*fb_info->xres_virtual*2);
	    ofs->write(reinterpret_cast<char*>(arr), fb_info->xres_virtual*2);
    }
}

void draw(const char* image_file, cv::Mat image, std::ofstream* ofs, framebuffer_info* fb_info)
{
    cv::Size2f image_size;
    image = cv::imread(image_file);
    
    image_size = image.size();
    //ofs->seekp()
    cv::cvtColor(image, image, cv::COLOR_BGR2BGR565);

    // output to framebufer row by row
    for (int y = 0; y < image_size.height; y++)
    {
	    ofs->seekp(y*fb_info->xres_virtual*2);
	    ofs->write(reinterpret_cast<char*>(image.ptr(y)),image_size.width*2);
    }

}



//todo let main only execute void init() and void draw()
int main(int argc, const char *argv[])
{

    cv::Mat demo;
    

    std::ofstream *ofs_demo = init_ofstream("/dev/fb0");    
    framebuffer_info *fb_info_demo = init_framebuffer_info("/dev/fb0");

    std::cout<<fb_info_demo->xres_virtual<<std::endl;
    std::cout<<"before loop"<<std::endl;

    for(int i =1; i<10;i++)
    {
        std::stringstream id_int;
        id_int<<i;
        std::string ID = id_int.str();
        std::string file_name = "./gifs/000"+ID+".bmp";
        std::cout<<file_name<<std::endl;
        draw(file_name.c_str(), demo, ofs_demo, fb_info_demo);
        sleep(0.06);

        if(i==9){i=1;}
    }
    

    
    

    return 0;
}

struct framebuffer_info get_framebuffer_info(const char *framebuffer_device_path)
{
    struct framebuffer_info fb_info;        // Used to return the required attrs.
    struct fb_var_screeninfo screen_info;   // Used to get attributes of the device from OS kernel.

    // open device with linux system call "open()"
    // https://man7.org/linux/man-pages/man2/open.2.html

	//add code here
	int fp = 0;
	fp = open(framebuffer_device_path,O_RDWR);

    // get attributes of the framebuffer device thorugh linux system call "ioctl()".
    // the command you would need is "FBIOGET_VSCREENINFO"
    // https://man7.org/linux/man-pages/man2/ioctl.2.html
    // https://www.kernel.org/doc/Documentation/fb/api.txt
	
	//add code here
	if (fp >= 0) 
	{
           if (!ioctl(fp, FBIOGET_VSCREENINFO, &screen_info)) 
      	  {
               fb_info.xres_virtual = screen_info.xres_virtual;
               fb_info.bits_per_pixel = screen_info.bits_per_pixel;
           }
        }
	printf("The xres is :%d\n",screen_info.xres);
	printf("The yres is :%d\n",screen_info.yres);
	printf("bits_per_pixel is :%d\n",screen_info.bits_per_pixel);
	//close (fp);

    // put the required attributes in variable "fb_info" you found with "ioctl() and return it."
    // fb_info.xres_virtual =       // 8
    // fb_info.bits_per_pixel =     // 16

    return fb_info;
};
