"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Database, CheckCircle, Copy, ExternalLink } from "lucide-react"

export function DatabaseSetupNotice() {
  const [showInstructions, setShowInstructions] = useState(false)
  const [copiedScript, setCopiedScript] = useState<string | null>(null)

  const sqlScripts = [
    {
      name: "01-create-tables.sql",
      description: "Creates the main tables (contact_messages, volunteer_signups, donation_interest)",
    },
    {
      name: "02-setup-rls.sql",
      description: "Sets up Row Level Security policies",
    },
    {
      name: "03-email-triggers.sql",
      description: "Creates logging triggers for form submissions",
    },
    {
      name: "04-create-resources-table.sql",
      description: "Creates the resources table for documents and publications",
    },
  ]

  const copyToClipboard = async (scriptName: string) => {
    try {
      await navigator.clipboard.writeText(`Run script: ${scriptName}`)
      setCopiedScript(scriptName)
      setTimeout(() => setCopiedScript(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  if (!showInstructions) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 mb-2">Database Setup Required</h3>
              <p className="text-amber-700 mb-4">
                The contact form is currently running in fallback mode. To enable full database functionality, you need
                to set up your Supabase database and run the SQL setup scripts.
              </p>
              <Button onClick={() => setShowInstructions(true)} className="bg-amber-600 hover:bg-amber-700 text-white">
                <Database className="w-4 h-4 mr-2" />
                Show Setup Instructions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Database className="w-5 h-5" />
          Database Setup Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Step 1: Configure Environment Variables</h4>
          <div className="space-y-2 text-blue-700">
            <p>Make sure these environment variables are set:</p>
            <div className="bg-blue-50 p-3 rounded font-mono text-sm">
              <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
              <div>SUPABASE_SERVICE_ROLE_KEY=your_service_role_key</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Step 2: Access Supabase Dashboard</h4>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Go to your Supabase project dashboard</li>
            <li>Navigate to the "SQL Editor" section</li>
            <li>Create a new query</li>
          </ol>
        </div>

        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Step 3: Run SQL Scripts</h4>
          <p className="text-blue-700 mb-4">Run these scripts in order:</p>
          <div className="space-y-3">
            {sqlScripts.map((script, index) => (
              <div key={script.name} className="flex items-center justify-between p-3 bg-blue-50 rounded border">
                <div className="flex-1">
                  <div className="font-medium text-blue-800">
                    {index + 1}. {script.name}
                  </div>
                  <div className="text-sm text-blue-600">{script.description}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(script.name)}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  {copiedScript === script.name ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Step 4: Verify Setup</h4>
          <p className="text-blue-700 mb-3">After running all scripts:</p>
          <ol className="list-decimal list-inside space-y-1 text-blue-700">
            <li>Refresh this page</li>
            <li>Try submitting the contact form</li>
            <li>Check that data is saved in your Supabase tables</li>
          </ol>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">💡 Quick Start</h4>
          <p className="text-green-700 text-sm mb-3">
            Need help? Check out the Supabase documentation for setting up your first project.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-100"
            onClick={() => window.open("https://supabase.com/docs/guides/getting-started", "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Supabase Docs
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setShowInstructions(false)}
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            Hide Instructions
          </Button>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white">
            Test Database Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
