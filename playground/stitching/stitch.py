import cv2

stitcher = cv2.createStitcher(False)
image_1 = cv2.imread("r0-c0.png")
image_2 = cv2.imread("r0-c1.png")
image_3 = cv2.imread("r0-c2.png")

result = stitcher.stitch((image_1,image_2, image_3))
cv2.imwrite("result.jpg", result[1])