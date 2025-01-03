import React, { useContext, useState } from "react";
import { Card, Col, Dropdown, Form, Modal, Row, Table } from "react-bootstrap";
import Button from "../../shared/button/button";
import Image from "next/image";
import { ApiDataContext } from "../utils/ContextState";
import Navigation from "@/app/navigation";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";
import PaginationComponent from "../components/pagination/PaginationComponent";

const UploadedBatchVerifictionData = () => {
  const [open, setOpen] = useState(false);
  const { certificateData } = useContext(ApiDataContext);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const groupedData = {
    valid: certificateData?.details?.filter((item) => item.status === "valid"),
    invalid: certificateData?.details?.filter(
      (item) => item.status === "invalid"
    ),
    revoked: certificateData?.details?.filter(
      (item) => item.status === "revoked"
    ),
  };

  const maxRows = Math.max(
    groupedData.valid?.length,
    groupedData.invalid?.length,
    groupedData.revoked?.length
  );
  const normalize = (arr, length) =>
    Array.from({ length }, (_, i) => arr[i] || { id: "", status: "" });

  const validData = normalize(groupedData.valid, maxRows);
  const invalidData = normalize(groupedData.invalid, maxRows);
  const revokedData = normalize(groupedData.revoked, maxRows);

  const tableRows = Array.from({ length: maxRows }, (_, i) => ({
    valid: validData[i]?.id || "",
    invalid: invalidData[i]?.id || "",
    revoked: revokedData[i]?.id || "",
  }));

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => row[header]).join(",")
    );
    return [headers.join(","), ...rows].join("\n");
  };
  const downloadCSV = () => {
    const csvData = convertToCSV(certificateData?.details);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    // Create a worksheet from the JSON data
    const worksheet = XLSX.utils.json_to_sheet(certificateData?.details);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and create a Blob
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const totalPages = Math.ceil(maxRows / itemsPerPage);

  // Get current page data
  const currentData = tableRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navigation />
      <div className="page-bg" style={{ paddingTop: "70px" }}>
        <div className="position-relative">
          <div className="vertical-center verify-cert">
            <div className="container-fluid">
              <Button className='back-btn' label='Back' onClick={()=>router.push('/batch-verification')} />
              <Row className="justify-content-center mt-4 verify-documents">
                <div className="d-flex justify-content-between align-items-center col-md-10 mb-3 flex-wrap gap-3">
                  <h1 className="title mb-0 text-center">Batch Verification</h1>
                  <div
                    className="d-flex p-1"
                    style={{ border: "2px solid #BFC0C2", background: "white" }}
                  >
                    <Button
                      className={`white rounded-0`}
                      label="Single Verification"
                      onClick={() => router.push("/verify-documents")}
                    />
                    <Button
                      className={`golden rounded-0`}
                      label="Batch Verification"
                    />
                  </div>
                </div>
                <div className="col-lg-10 mb-3 mb-lg-4">
                  <div className="row">
                    <div className="col-6 col-lg-3 mb-3">
                      <div className="card-batch d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-xs fw-semibold mb-2">
                            Total Credentials
                          </p>
                          <h3>{certificateData?.total}</h3>
                        </div>
                        <div>
                          <Image
                            src="/backgrounds/group2500.png"
                            alt="icon"
                            width={34}
                            height={34}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-lg-3  mb-3">
                      <div className="card-batch d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-xs fw-semibold mb-2">
                            Valid Credentials
                          </p>
                          <h3>{certificateData?.valid}</h3>
                        </div>
                        <div>
                          <Image
                            src="/backgrounds/group2500.png"
                            alt="icon"
                            width={34}
                            height={34}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-lg-3  mb-3">
                      <div className="card-batch d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-xs fw-semibold mb-2">
                            Invalid Credentials
                          </p>
                          <h3>{certificateData?.invalid}</h3>
                        </div>
                        <div>
                          <Image
                            src="/backgrounds/group2500.png"
                            alt="icon"
                            width={34}
                            height={34}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-lg-3  mb-3">
                      <div className="card-batch d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-xs fw-semibold mb-2">
                            Revoked Credentials
                          </p>
                          <h3>{certificateData?.revoked}</h3>
                        </div>
                        <div>
                          <Image
                            src="/backgrounds/group2500.png"
                            alt="icon"
                            width={34}
                            height={34}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Col md={{ span: 10 }}>
                  <Card
                    className="add-recipent"
                    style={{ border: "1px solid #BFC0C2" }}
                  >
                    <div
                      className="d-flex justify-content-between align-items-center flex-row gap-3"
                      style={{ padding: "16px 20px" }}
                    >
                      <h5
                        className="txt-22 fw-semibold mb-0"
                        style={{ color: "#1C1F30" }}
                      >
                        Recipients
                      </h5>

                      <Dropdown className="mobile-dropdown">
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="upload-batch custom-dropdown"
                        >
                          <i class="bx bx-download"></i>
                          Download
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                          style={{ minWidth: "110px", padding: "10px" }}
                        >
                          <Dropdown.Item className="custom-dropdown-item">
                            <button
                              className="upload-batch"
                              onClick={downloadCSV}
                              style={{ border: "none" }}
                            >
                              <i class="bx bx-download"></i> CSV
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item className="custom-dropdown-item">
                            <button
                              className="upload-batch"
                              onClick={downloadExcel}
                              style={{ border: "none" }}
                            >
                              <i class="bx bx-download"></i> XLS
                            </button>
                          </Dropdown.Item>
                          <Dropdown.Item
                            style={{ backgroundColor: "transparent" }}
                          >
                            <button
                              className="upload-batch"
                              onClick={downloadExcel}
                              style={{ border: "none" }}
                            >
                              <i class="bx bx-download"></i> XLSX
                            </button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                      <div className="d-flex gap-2 align-items-center flex-wrap desktop-view">
                        <button className="upload-batch" onClick={downloadCSV}>
                          <i class="bx bx-download"></i> CSV
                        </button>
                        <button
                          className="upload-batch"
                          onClick={downloadExcel}
                        >
                          <i class="bx bx-download"></i> XLS
                        </button>
                        <button
                          className="upload-batch"
                          onClick={downloadExcel}
                        >
                          <i class="bx bx-download"></i> XLSX
                        </button>
                      </div>
                    </div>
                    <div className="overflow-auto">
                      <Table>
                        <thead>
                          <tr
                            className=""
                            style={{ backgroundColor: "#F3F3F3" }}
                          >
                            <th>S.No.</th>
                            <th>Valid Certificate(s)</th>
                            <th>Invalid Certificate(s)</th>
                            <th>Revoked Certificate(s)</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {/* {Array.from({ length: maxRows }).map((_, index) => (
                            <tr key={index}>
                              <td>{index + 1}.</td>
                              <td>{validData[index]?.id}</td>
                              <td>{invalidData[index]?.id}</td>
                              <td>{revokedData[index]?.id}</td>
                            </tr>
                          ))} */}
                          {currentData.map((row, index) => (
                            <tr key={index}>
                              <td>
                                {(currentPage - 1) * itemsPerPage + index + 1}.
                              </td>
                              <td>{row.valid}</td>
                              <td>{row.invalid}</td>
                              <td>{row.revoked}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        maxRows={maxRows}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <div className="page-footer-bg"></div>
    </>
  );
};

export default UploadedBatchVerifictionData;
