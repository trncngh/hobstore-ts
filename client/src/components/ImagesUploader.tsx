import { Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  Input,
  InputLabel,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { loadProductImages } from "../features/admin/products/productsSlice";
import ImagesGrid from "./ImagesGrid";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import LoadingBackdrop from "./LoadingBackdrop";

interface ImagesUploaderProps {
  handleSelectFiles: (e: any) => void;
  handleUploadImages: () => void;
  previewImages: File[];
  preUploadImages: { name: string; percentage: number }[];
  handleRemoveImage: (isLoaded: boolean, id: number) => void;
  loadedImages: { id: number; alt: string; url: string }[];
  isLoadingDetails: boolean;
  productId: number;
}

const ImagesUploader = ({
  handleSelectFiles,
  handleUploadImages,
  previewImages,
  preUploadImages,
  handleRemoveImage,
  loadedImages,
  isLoadingDetails,
  productId,
}: ImagesUploaderProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProductImages(productId));
  }, [dispatch, productId]);

  return (
    <Container>
      {isLoadingDetails ? (
        <LoadingBackdrop />
      ) : (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputLabel sx={{ background: "#4CAF50" }} htmlFor="product-file">
              {previewImages.length
                ? previewImages.length + " new file(s) are selected"
                : "Choose images"}
            </InputLabel>
            <Button
              size="large"
              aria-label="Upload images"
              color="inherit"
              onClick={handleUploadImages}
              sx={{
                float: "right",
              }}
              disabled={previewImages.length === 0}
            >
              Upload
              <Upload />
            </Button>
            <Input
              id="product-file"
              type="file"
              inputProps={{
                multiple: true,
                accept: "image/*",
              }}
              sx={{ visibility: "hidden" }}
              onChange={(e) => handleSelectFiles(e)}
            />
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              "--Grid-borderWidth": "1px",
              borderTop: "var(--Grid-borderWidth) solid",
              borderLeft: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
              "& > div": {
                borderRight: "var(--Grid-borderWidth) solid",
                borderBottom: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
              },
            }}
          >
            <ImageList
              sx={{ width: "100%", height: 400 }}
              cols={3}
              rowHeight={164}
            >
              {loadedImages && (
                <ImagesGrid
                  imagesList={loadedImages}
                  isLoaded={true}
                  handleRemoveImage={handleRemoveImage}
                />
              )}
              {previewImages && (
                <ImagesGrid
                  imagesList={previewImages}
                  isLoaded={false}
                  handleRemoveImage={handleRemoveImage}
                />
              )}
            </ImageList>
          </Grid>
        </Box>
      )}
      {preUploadImages &&
        preUploadImages.map((item, index: number) => {
          return (
            <Box sx={{ display: " flex", alignItems: "center" }} key={index}>
              <LinearProgressWithLabel
                value={item.percentage}
                name={item.name}
              />
            </Box>
          );
        })}
    </Container>
  );
};

export default ImagesUploader;
