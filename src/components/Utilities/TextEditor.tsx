"use client";

import { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function TextEditor(props: any) {
  const editorRef = useRef<any>(null);
  const [initialValue, setInitialValue] = useState<string>(
    "Start writing your thoughts here"
  );
  const [isInitial, setIsInitial] = useState(true);

  const debounceTimer = useRef<any>(null);
  const toolbarRef = useRef<any>(null);

  useEffect(() => {
    const convertAndSanitize = async (dataToSanitize: string) => {
      if (dataToSanitize) {
        const rawHTML = await marked(dataToSanitize);
        const sanitizedHTML = DOMPurify.sanitize(rawHTML);
        setInitialValue(sanitizedHTML);
      } else {
        setInitialValue("");
      }
    };

    let dataToSanitize = props.value;

    convertAndSanitize(dataToSanitize);
  }, [props.value]);
  console.log("INNER TEXT", initialValue);

  // const moveToolbar = () => {
  //   const selection = editorRef.current.selection.getRng();
  //   const selectionRect = selection.getBoundingClientRect();
  //   const toolbar = toolbarRef.current;

  //   const isSpaceSelected = selectionRect.x === 0 && selectionRect.top === 0;

  //   if (selectionRect && toolbar) {
  //     toolbar.style.top = !isSpaceSelected
  //       ? `${window.scrollY + selectionRect.top - 50}px`
  //       : `${window.scrollY + 100}px`;
  //     toolbar.style.left = !isSpaceSelected
  //       ? `${window.scrollX + selectionRect.left}px`
  //       : `100px`;
  //     toolbar.style.position = "absolute";
  //     toolbar.style.zIndex = 1000;
  //     toolbar.style.visibility = "visible";
  //   }
  // };

  const copyResponseHandler = async () => {
    try {
      console.log("ED", editorRef.current);
      await navigator.clipboard.writeText(
        editorRef.current.getContent({ format: "text" })
      );
      toast.success("Response copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy response");
    }
  };

  const saveEditedResponseHandler = async (event: any) => {
    if (editorRef.current && !isInitial) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        const response = await props.onSubmit(
          props.adId,
          editorRef.current.getContent(),
          0
        );
        if (!response) {
          toast.error("Could not update response");
        } else {
          if (props.responseUpdatedHandler) {
            props.responseUpdatedHandler();
          }
          toast.success("Saved");
        }
        debounceTimer.current = null;
      }, 3000);
    } else {
      setIsInitial(false);
    }
  };

  const style = `
    html {
      background-color: #000000!important;
      color: white!important;
    }
    body:first-child {
      margin-top: 0;
    }
    .tox .tox-toolbar {
      background-color: #333333;
    }
  `;

  return (
    <div className={`rounded-md w-full min-h-fit flex flex-col gap-y-3`}>
      <span
        className="hover:cursor-pointer font-bold text-primary text-right"
        onClick={copyResponseHandler}
      >
        Copy text
      </span>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        apiKey={process.env.EDITOR_API_KEY}
        initialValue={initialValue}
        onEditorChange={saveEditedResponseHandler}
        licenseKey="gpl"
        disabled={!props.canEdit}
        init={{
          height: 1200,
          menubar: false,
          placeholder: "Start writing your thoughts here",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media spellcheckdialog | align lineheight | checklist numlist bullist indent outdent | emoticons charmap",
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace visualblocks linkchecker numlist bullist",
          branding: false,
          content_style: style,

          images_upload_handler: (blob: any) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64: any = reader.result;
                resolve(base64);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob.blob());
            }),
        }}
      />
    </div>
  );
}
